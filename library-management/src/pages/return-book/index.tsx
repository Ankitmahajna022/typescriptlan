import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { returnBook } from "../../store/library.slice";

export default function ReturnBook() {

    const dispatch = useDispatch<AppDispatch>();
    const issuedBooks = useSelector(
        (state: RootState) => state.issuedBooks
    );

    const handleReturn = (issueId: string) => {
        dispatch(returnBook({ issueId }));
    };
    return (
        <div>
            <div style={{ padding: 20 }}>
                <h2>Return Book</h2>
                {issuedBooks.map(issue => (
                    <button key={issue.id} onClick={() => handleReturn(issue.id)}>
                        Return {issue.bookId}
                    </button>
                ))}
            </div>
        </div>
    )
}
