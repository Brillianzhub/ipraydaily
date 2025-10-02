import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
        if (currentPage <= 4) {
            for (let i = 1; i <= 5; i++) pages.push(i);
            pages.push('ellipsis');
            pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
            pages.push(1);
            pages.push('ellipsis');
            for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            pages.push('ellipsis');
            for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
            pages.push('ellipsis');
            pages.push(totalPages);
        }
    } else {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
    }

    // Mobile-specific logic - show fewer pages on small screens
    const getMobilePages = () => {
        if (totalPages <= 3) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const mobilePages = [];
        if (currentPage === 1) {
            mobilePages.push(1, 2, 3);
        } else if (currentPage === totalPages) {
            mobilePages.push(totalPages - 2, totalPages - 1, totalPages);
        } else {
            mobilePages.push(currentPage - 1, currentPage, currentPage + 1);
        }

        return mobilePages.filter(page => page >= 1 && page <= totalPages);
    };

    const mobilePages = getMobilePages();

    return (
        <>
            {/* Desktop Pagination */}
            <div className="hidden sm:flex items-center justify-center space-x-2 mt-8">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                </button>

                {pages.map((page, index) => (
                    page === 'ellipsis' ? (
                        <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm font-medium text-gray-500">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === page
                                ? 'bg-[#0284C7] text-white'
                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                                }`}
                        >
                            {page}
                        </button>
                    )
                ))}

                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>

            {/* Mobile Pagination */}
            <div className="flex sm:hidden items-center justify-between mt-6 px-4">
                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[80px] justify-center"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Prev
                </button>

                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                    {mobilePages.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-10 h-10 text-sm font-medium rounded-lg transition-colors ${currentPage === page
                                ? 'bg-[#0284C7] text-white'
                                : 'text-gray-600 bg-white border border-gray-300 hover:bg-gray-50'
                                }`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[80px] justify-center"
                >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>

            {/* Mobile Page Info */}
            <div className="flex sm:hidden justify-center mt-3">
                <span className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </span>
            </div>

            {/* Mobile Jump to Page (for large page counts) */}
            {totalPages > 10 && (
                <div className="flex sm:hidden justify-center mt-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Go to:</span>
                        <select
                            value={currentPage}
                            onChange={(e) => onPageChange(parseInt(e.target.value))}
                            className="px-3 py-1 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#0284C7] focus:border-transparent"
                        >
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <option key={page} value={page}>
                                    Page {page}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </>
    );
};
export default Pagination