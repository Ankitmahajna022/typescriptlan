import Dashboard from "../pages/dashboard";
import Books from "../pages/books";
import IssueBook from "../pages/issue-book";
import ReturnBook from "../pages/return-book";
import Members from "../pages/members";

import{ROUTE} from "../Constants/Router"
import AddBook from "../pages/books/AddBook";
import EditBook from "../pages/books/EditBook";
import AddMember from "../pages/members/AddMember";
import EditMember from "../pages/members/EditMember";


export const PageRoutes=[
    {
        path:ROUTE.DASHBOARD,
        element:<Dashboard/>
    },
    {
        path:ROUTE.BOOKS.LIST,
        element:<Books/>
    },
    {
         path:ROUTE.BOOKS.ADD,
        element:<AddBook/>
    },
    {
         path:ROUTE.BOOKS.EDIT,
        element:<EditBook/>
    },
    {
        path:ROUTE.MEMBERS.LIST,
        element:<Members/>
    },
    {
         path:ROUTE.MEMBERS.ADD,
        element:<AddMember/>
    },
    {
         path:ROUTE.MEMBERS.EDIT,
        element:<EditMember/>
    },
    {
        path:ROUTE.ISSUEBOOKS.ISSUE,
        element:<IssueBook/>
    },
    {
        path:ROUTE.RETURNBOOK.RETURN,
        element:<ReturnBook/>
    }
]