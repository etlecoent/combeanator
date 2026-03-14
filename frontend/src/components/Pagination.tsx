import {
	Pagination as BasePagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	windowSize?: number;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	windowSize = 5,
}: PaginationProps) {
	const half = Math.floor(windowSize / 2);
	let windowStart = Math.max(1, currentPage - half);
	const windowEnd = Math.min(totalPages, windowStart + windowSize - 1);
	windowStart = Math.max(1, windowEnd - windowSize + 1);

	const pageNumbers = [];
	for (let i = windowStart; i <= windowEnd; i++) {
		pageNumbers.push(i);
	}

	return (
		<BasePagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href="#"
						onClick={(e) => {
							e.preventDefault();
							if (currentPage > 1) onPageChange(currentPage - 1);
						}}
					/>
				</PaginationItem>

				{windowStart > half && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				{pageNumbers.map((pageNum) => (
					<PaginationItem key={pageNum}>
						<PaginationLink
							href="#"
							isActive={currentPage === pageNum}
							onClick={(e) => {
								e.preventDefault();
								onPageChange(pageNum);
							}}
						>
							{pageNum}
						</PaginationLink>
					</PaginationItem>
				))}
				{windowEnd < totalPages - windowSize && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}

				<PaginationItem>
					<PaginationNext
						href="#"
						onClick={(e) => {
							e.preventDefault();
							if (currentPage < totalPages) onPageChange(currentPage + 1);
						}}
					/>
				</PaginationItem>
			</PaginationContent>
		</BasePagination>
	);
}
