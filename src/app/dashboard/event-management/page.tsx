"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Edit2, Trash2, ExternalLink, Search, Filter, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { api } from '@/services/requests/axiosInstance';
import { toast } from 'sonner';

const EventManagementPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingEvent, setEditingEvent] = useState(null);
    const [deletingEvent, setDeletingEvent] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterActive, setFilterActive] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [eventsPerPage] = useState(6);

    // Mock API call - replace with your actual API
    const fetchEvents = async () => {
        try {
            setLoading(true);
            // Simulate API call
            const response = await api.get("/events")
            setEvents(response.data);
            setLoading(false);
            // setTimeout(() => {
            //     const mockEvents = [
            //         {
            //             "id": 7,
            //             "title": "Faith Convention Nigeria",
            //             "description": "Koinonia Global presents Faith Convention (AKA) The General Assembly.",
            //             "start_date": "2025-11-19T00:00:00Z",
            //             "end_date": "2025-11-23T00:00:00Z",
            //             "website_link": "https://www.eventbrite.com/e/koinonia-the-general-assembly-tickets-1671048173069?aff=ebdsshcopyurl&utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=organizer-profile&utm-share-source=organizer-profile",
            //             "created_at": "2025-08-22T06:53:54.521833Z",
            //             "is_active": true,
            //             "created_by": 7
            //         },
            //         {
            //             "id": 8,
            //             "title": "Tech Innovation Summit",
            //             "description": "Annual technology conference featuring the latest innovations in AI, blockchain, and web development.",
            //             "start_date": "2025-10-15T09:00:00Z",
            //             "end_date": "2025-10-17T18:00:00Z",
            //             "website_link": "https://techinnovationsummit.com",
            //             "created_at": "2025-09-01T10:30:00Z",
            //             "is_active": true,
            //             "created_by": 7
            //         }
            //     ];
            //     setEvents(mockEvents);
            //     setLoading(false);
            // }, 1000);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getEventDuration = (startDate, endDate) => {
        const start: any = new Date(startDate);
        const end: any = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterActive === 'all' ||
            (filterActive === 'active' && event.is_active) ||
            (filterActive === 'inactive' && !event.is_active);
        return matchesSearch && matchesFilter;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    const currentEvents = filteredEvents.slice(startIndex, endIndex);

    // Reset to first page when search or filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, filterActive]);

    const CreateEventModal = () => {
        const [formData, setFormData] = useState({
            title: '',
            description: '',
            start_date: '',
            end_date: '',
            website_link: '',
            is_active: true
        });

        const isEditing = editingEvent !== null;

        // Prepopulate form when editing
        useEffect(() => {
            if (editingEvent) {
                const formatDateForInput = (dateString) => {
                    const date = new Date(dateString);
                    return date.toISOString().slice(0, 16); // Format for datetime-local input
                };

                setFormData({
                    title: editingEvent.title || '',
                    description: editingEvent.description || '',
                    start_date: formatDateForInput(editingEvent.start_date),
                    end_date: formatDateForInput(editingEvent.end_date),
                    website_link: editingEvent.website_link || '',
                    is_active: editingEvent.is_active
                });
            } else {
                setFormData({
                    title: '',
                    description: '',
                    start_date: '',
                    end_date: '',
                    website_link: '',
                    is_active: true
                });
            }
        }, [editingEvent]);

        const handleSubmit = async () => {
            try {
                // Convert datetime-local format to ISO string for API
                const eventData = {
                    ...formData,
                    start_date: new Date(formData.start_date).toISOString(),
                    end_date: new Date(formData.end_date).toISOString()
                };

                if (isEditing) {
                    // Update existing event
                    await api.put(`/events/${editingEvent.id}/`, eventData);
                    console.log('Event updated successfully');
                } else {
                    // Create new event
                    await api.post("/events/", eventData);
                    console.log('Event created successfully');
                }

                setShowCreateModal(false);
                setEditingEvent(null);
                // Refresh events list
                await fetchEvents();
            } catch (error) {
                console.error('Error saving event:', error.response?.data || error);
                // Optionally show error message to user
                alert('Failed to save event. Please check all fields and try again.');
            }
        };
        const handleClose = () => {
            setShowCreateModal(false);
            setEditingEvent(null);
        };

        const handleChange = (e) => {
            const { name, value, type, checked } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">
                            {isEditing ? 'Edit Event' : 'Create New Event'}
                        </h2>
                    </div>

                    <div className="p-6 space-y-4">
                        <div>
                            <div className="block text-sm font-medium text-gray-700 mb-2">Event Title</div>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077CC]"
                                required
                            />
                        </div>

                        <div>
                            <div className="block text-sm font-medium text-gray-700 mb-2">Description</div>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077CC]"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <div className="block text-sm font-medium text-gray-700 mb-2">Start Date & Time</div>
                                <input
                                    type="datetime-local"
                                    name="start_date"
                                    value={formData.start_date}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077CC]"
                                    required
                                />
                            </div>

                            <div>
                                <div className="block text-sm font-medium text-gray-700 mb-2">End Date & Time</div>
                                <input
                                    type="datetime-local"
                                    name="end_date"
                                    value={formData.end_date}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077CC]"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <div className="block text-sm font-medium text-gray-700 mb-2">Website Link</div>
                            <input
                                type="url"
                                name="website_link"
                                value={formData.website_link}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077CC]"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="is_active"
                                id="is_active"
                                checked={formData.is_active}
                                onChange={handleChange}
                                className="h-4 w-4 text-[#0077CC] focus:ring-[#0077CC] border-gray-300 rounded"
                            />
                            <div className="ml-2 block text-sm text-gray-700">
                                Event is active
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#0077CC] border border-transparent rounded-md hover:bg-[#005fa3] focus:outline-none focus:ring-2 focus:ring-[#0077CC]"
                            >
                                {isEditing ? 'Update Event' : 'Create Event'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const EventCard = ({ event }) => {
        const duration = getEventDuration(event.start_date, event.end_date);
        const isUpcoming = new Date(event.start_date) > new Date();
        const isPast = new Date(event.end_date) < new Date();
        const isOngoing = new Date(event.start_date) <= new Date() && new Date(event.end_date) >= new Date();

        const getStatusBadge = () => {
            if (isPast) return { text: 'Past', color: 'bg-gray-100 text-gray-800' };
            if (isOngoing) return { text: 'Ongoing', color: 'bg-green-100 text-green-800' };
            if (isUpcoming) return { text: 'Upcoming', color: 'bg-blue-100 text-blue-800' };
            return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
        };

        const status = getStatusBadge();

        return (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{event.description}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                {status.text}
                            </span>
                            {event.is_active && (
                                <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 text-[#0077CC]" />
                            <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-[#0077CC]" />
                            <span>{formatTime(event.start_date)} - {formatTime(event.end_date)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-2 text-[#0077CC]" />
                            <span>{duration} day{duration !== 1 ? 's' : ''}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => {
                                    setEditingEvent(event);
                                    setShowCreateModal(true);
                                }}
                                className="p-2 text-gray-400 hover:text-[#0077CC] hover:bg-blue-50 rounded-md transition-colors"
                                title="Edit event"
                            >
                                <Edit2 className="h-4 w-4" />
                            </button>

                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <button
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="Delete event"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Delete Event</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Are you sure you want to delete "{event.title}"? This action cannot be undone.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={async () => {
                                                // Delete event API call here
                                                const response = await api.delete("/events/")
                                                toast.success("events deleted")
                                                // Remove event from state (or refresh from API)
                                                setEvents(prevEvents => prevEvents.filter(e => e.id !== event.id));
                                            }}
                                            className="bg-red-600 hover:bg-red-700"
                                        >
                                            Delete Event
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                        {event.website_link && (
                            <a
                                href={event.website_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1 text-sm text-[#0077CC] hover:text-[#005fa3] hover:bg-blue-50 rounded-md transition-colors"
                            >
                                <ExternalLink className="h-4 w-4 mr-1" />
                                Visit Site
                            </a>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Management</h1>
                            <p className="text-gray-600">Manage your events and track their performance</p>
                        </div>
                        <button
                            onClick={() => {
                                setEditingEvent(null);
                                setShowCreateModal(true);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-[#0077CC] text-white text-sm font-medium rounded-md hover:bg-[#005fa3] focus:outline-none focus:ring-2 focus:ring-[#0077CC] transition-colors"
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Create Event
                        </button>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0077CC]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Events Grid */}
            <div className="max-w-7xl mx-auto">
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0077CC]"></div>
                    </div>
                ) : currentEvents.length === 0 ? (
                    <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchTerm || filterActive !== 'all'
                                ? 'Try adjusting your search or filters'
                                : 'Get started by creating your first event'
                            }
                        </p>
                        {!searchTerm && filterActive === 'all' && (
                            <button
                                onClick={() => {
                                    setEditingEvent(null);
                                    setShowCreateModal(true);
                                }}
                                className="inline-flex items-center px-4 py-2 bg-[#0077CC] text-white text-sm font-medium rounded-md hover:bg-[#005fa3] focus:outline-none focus:ring-2 focus:ring-[#0077CC] transition-colors"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Create Your First Event
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {currentEvents.map(event => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between mt-8 px-4 py-3 bg-white border border-gray-200 rounded-lg">
                                <div className="flex items-center text-sm text-gray-700">
                                    <span>
                                        Showing {startIndex + 1} to {Math.min(endIndex, filteredEvents.length)} of{' '}
                                        {filteredEvents.length} events
                                    </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    {[...Array(totalPages)].map((_, index) => {
                                        const page = index + 1;
                                        const isCurrentPage = page === currentPage;

                                        // Show first page, last page, current page, and pages around current page
                                        const shouldShow = page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1);

                                        if (!shouldShow) {
                                            // Show ellipsis for gaps
                                            if (page === currentPage - 2 || page === currentPage + 2) {
                                                return (
                                                    <span key={page} className="px-2 py-1 text-gray-400">
                                                        ...
                                                    </span>
                                                );
                                            }
                                            return null;
                                        }

                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`relative inline-flex items-center px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-md ${isCurrentPage
                                                    ? 'bg-[#0077CC] text-white ring-[#0077CC]'
                                                    : 'text-gray-900 bg-white hover:bg-gray-50'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed rounded-md"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modals */}
            {showCreateModal && <CreateEventModal />}
        </div>
    );
};

export default EventManagementPage;