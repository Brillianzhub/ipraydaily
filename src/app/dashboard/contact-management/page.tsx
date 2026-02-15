"use client"
import React, { useState, useEffect } from 'react';
import {
    Contact,
    Mail,
    Phone,
    MessageSquare,
    Calendar,
    Search,
    Filter,
    Eye,
    ArrowLeft,
    Users,
    Clock,
    AlertTriangle,
    CheckCircle,
    XCircle,
    User,
    FileText,
    MoreVertical
} from 'lucide-react';
import { api } from '@/services/requests/axiosInstance';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const ContactManagementPage = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [loading, setLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalContacts, setTotalContacts] = useState(0);

    // Fetch contacts list
    useEffect(() => {
        fetchContacts();
    }, [currentPage, searchTerm, filterStatus]);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                ...(searchTerm && { search: searchTerm }),
                ...(filterStatus !== 'all' && { status: filterStatus })
            });

            const response = await api.get(`/contact/fetch/?${params}`);

            // Assuming the API returns paginated data
            if (response.data.results) {
                setContacts(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 10));
                setTotalContacts(response.data.count);
            } else {
                // If not paginated, handle as simple array
                setContacts(response.data);
                setTotalContacts(response.data.length);
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch contact details
    const fetchContactDetails = async (contactId) => {
        try {
            setDetailLoading(true);
            const response = await api.get(`/contact/fetch/${contactId}/`);
            setSelectedContact(response.data);
        } catch (error) {
            console.error('Error fetching contact details:', error);
        } finally {
            setDetailLoading(false);
        }
    };

    // Handle contact selection
    const handleContactSelect = async (contact) => {
        setDialogOpen(true);
        await fetchContactDetails(contact.id);
    };

    // Filter contacts based on search and status
    const filteredContacts = contacts.filter(contact => {
        const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.subject?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    // Get status badge
    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock, text: 'Pending' },
            in_progress: { color: 'bg-blue-100 text-blue-800', icon: MessageSquare, text: 'In Progress' },
            resolved: { color: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Resolved' },
            closed: { color: 'bg-gray-100 text-gray-800', icon: XCircle, text: 'Closed' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        const Icon = config.icon;

        return (
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                <Icon size={12} />
                {config.text}
            </span>
        );
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-8">
                <div className="mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                            <Contact className="text-[#0077CC]" size={32} />
                            Contact Management
                        </h1>
                        <p className="text-gray-600">Manage and respond to user contacts and inquiries</p>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="w-1/2 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search contacts by name, email, or subject..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077CC] focus:border-transparent"
                        />
                    </div>
                 
                </div>
            </div>

            {/* Contacts Table */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="w-8 h-8 border-4 border-[#0077CC] border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-3 text-gray-600">Loading contacts...</span>
                    </div>
                ) : filteredContacts.length === 0 ? (
                    <div className="text-center py-12">
                        <Contact className="mx-auto text-gray-400 mb-4" size={48} />
                        <p className="text-gray-600 text-lg mb-2">No contacts found</p>
                        <p className="text-gray-400">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Subject</th>
                                    {/* <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th> */}
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredContacts.map((contact) => (
                                    <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#0077CC] bg-opacity-10 rounded-full flex items-center justify-center">
                                                    <User className="text-[#0077CC]" size={16} />
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{contact.name}</div>
                                                    <div className="text-sm text-gray-500">{contact.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900 truncate max-w-xs">
                                                {contact.subject}
                                            </div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">
                                                {contact.message?.substring(0, 50)}...
                                            </div>
                                        </td>
                                        {/* <td className="py-3 px-4">
                                            {getStatusBadge(contact.status)}
                                        </td> */}
                                        <td className="py-3 px-4 text-sm text-gray-500">
                                            {formatDate(contact.created_at)}
                                        </td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleContactSelect(contact)}
                                                className="p-2 text-gray-400 hover:text-[#0077CC] hover:bg-gray-100 rounded-lg transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t">
                        <div className="text-sm text-gray-500">
                            Showing {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalContacts)} of {totalContacts} contacts
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1 text-sm font-medium">
                                {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Contact Details Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Contact size={20} className="text-[#0077CC]" />
                            Contact Details
                        </DialogTitle>
                        <DialogDescription>
                            View and manage contact information and message details
                        </DialogDescription>
                    </DialogHeader>

                    {detailLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="w-6 h-6 border-4 border-[#0077CC] border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-3 text-gray-600">Loading details...</span>
                        </div>
                    ) : selectedContact && (
                        <div className="space-y-6">
                            {/* Contact Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Name</label>
                                        <p className="text-gray-900">{selectedContact.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Email</label>
                                        <div className="flex items-center gap-2">
                                            <Mail size={16} className="text-gray-400" />
                                            <p className="text-gray-900">{selectedContact.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Phone</label>
                                        <div className="flex items-center gap-2">
                                            <Phone size={16} className="text-gray-400" />
                                            <p className="text-gray-900">{selectedContact.phone || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Status</label>
                                        <div className="mt-1">
                                            {getStatusBadge(selectedContact.status)}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Date Submitted</label>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={16} className="text-gray-400" />
                                            <p className="text-gray-900">{formatDate(selectedContact.created_at)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                                <p className="text-gray-900 font-medium">{selectedContact.subject}</p>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                        {selectedContact.message}
                                    </p>
                                </div>
                            </div>

                            {/* Additional Info */}
                            {selectedContact.additional_info && (
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">Additional Information</label>
                                    <p className="text-gray-600 text-sm">{selectedContact.additional_info}</p>
                                </div>
                            )}

                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ContactManagementPage;