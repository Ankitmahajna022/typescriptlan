import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { issueBook } from "../../store/library.slice";

export default function IssueBook() {
    const dispatch = useDispatch<AppDispatch>();
    const books = useSelector((state: RootState) => state.books)
    const members = useSelector((state: RootState) => state.members)

    const handleIssue = () => {
        dispatch(issueBook({
            bookId: books[0].id,
            memberId: members[0].id
        }));
    };
    return (
        <div>
            <div style={{ padding: 20 }}>
                <h2>Issue Book</h2>
                <button onClick={handleIssue}>Issue First Book</button>
            </div>
        </div>
    )
}
