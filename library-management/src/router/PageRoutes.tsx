import Dashboard from "../pages/dashboard";
import Books from "../pages/books";
import IssueBook from "../pages/issue-book";
import ReturnBook from "../pages/return-book";
import Members from "../pages/members";

import{ROUTE} from "../Constants/Router"


export const PageRoutes=[
    {
        path:ROUTE.DASHBOARD,
        element:<Dashboard/>
    },
    {
        path:ROUTE.BOOKS.BOOKS,
        element:<Books/>
    },
    {
        path:ROUTE.MEMBERS.MEMBERS,
        element:<Members/>
    },
    {
        path:ROUTE.ISSUEBOOKS.ISSUEBOOK,
        element:<IssueBook/>
    },
    {
        path:ROUTE.RETURNBOOK.RETURNBOOK,
        element:<ReturnBook/>
    }
]