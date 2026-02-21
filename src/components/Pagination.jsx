import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export function PaginationComponent({ currentPage, totalPages, onPageChange, totalCount, pageSize }) {
    const handleChange = (event, value) => {
        onPageChange(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (totalPages <= 1) return null;

    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalCount);

    return (
        <div className="flex flex-col items-center gap-4 my-6">
            {/* Results Info */}
            <div className="text-sm text-gray-700 font-medium">
                Showing {startItem}-{endItem} of {totalCount} results
            </div>

            {/* MUI Pagination */}
            <Stack spacing={2}>
                <Pagination 
                    count={totalPages} 
                    page={currentPage} 
                    onChange={handleChange}
                    color="primary"
                    size="large"
                    showFirstButton 
                    showLastButton
                    sx={{
                        '& .MuiPaginationItem-root': {
                            color: '#1e40af',
                            fontWeight: 'bold',
                        },
                        '& .Mui-selected': {
                            backgroundColor: '#2563eb !important',
                            color: 'white',
                        },
                        '& .MuiPaginationItem-root:hover': {
                            backgroundColor: '#dbeafe',
                        },
                    }}
                />
            </Stack>
        </div>
    );
}
