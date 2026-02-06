import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../store"
import { 
    fetchBooks, 
    createBook, 
    updateBook, 
    deleteBook, 
    fetchMembers,    
    createMember , 
    updateMember, 
    deleteMember, 
    fetchIssuedBooks, 
    createIssue, 
    returnIssue
} from "../services/libraryApi"
import { 
    setBooks, 
    setIssuedBooks, 
    setMembers, 
    addBook, 
    updateBooks, 
    deleteBooks, 
    addMember, 
    updateMembers, 
    deleteMembers, 
    issueBook, 
    returnBook 
} from "../store/library.slice"




// Books Mutation..!

export const useBooks = () => {
    const dispatch = useDispatch<AppDispatch>()

    return useQuery({
        queryKey: ["books"],
        queryFn: fetchBooks,
        select: (data) => {
            dispatch(setBooks(data))
            return data
        }
    });
}

export const useCreateBooks = () => {
    const dispatch = useDispatch<AppDispatch>()

    return useMutation({
        mutationFn: createBook,
        onSuccess: book => dispatch(addBook(book))
    });

}

export const useUpdateBooks = () => {
    const dispatch = useDispatch<AppDispatch>()

    return useMutation({
        mutationFn:updateBook,
        onSuccess:book=>dispatch(updateBooks(book))
    });

}

export const usedeleteBooks=()=>{
    const dispatch=useDispatch<AppDispatch>()
    
    return useMutation({
        mutationFn:deleteBook,
        onSuccess:(_, bookId)=>dispatch(deleteBooks(bookId))
    })
}


// members  Mutation...!

export const useMembers=()=>{
 const dispatch=useDispatch<AppDispatch>()

  return useQuery({
    queryKey:["members"],
    queryFn:fetchMembers,
    select:data=>{
        dispatch(setMembers(data));
        return data;
    }
  });
}

export const useCreateMembers=()=>{
    const dispatch=useDispatch<AppDispatch>()

    return useMutation({
        mutationFn:createMember,
        onSuccess:member=>dispatch(addMember(member))
    });
}

export const useUpdateMembers=()=>{
    const dispatch=useDispatch<AppDispatch>()

    return useMutation({
        mutationFn:updateMember,
        onSuccess:member=>dispatch(updateMembers(member))
    })
}

export const useDeleteMembers=()=>{
    const dispatch=useDispatch<AppDispatch>()
   
    return useMutation({
        mutationFn:deleteMember,
        onSuccess:(_,memberId)=>dispatch(deleteMembers(memberId))
    })
}

//ISSUE / RETURN...!

export const useIssuedBooks = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useQuery({
    queryKey: ["issuedBooks"],
    queryFn: fetchIssuedBooks,
    select: (data) => {
      dispatch(setIssuedBooks(data));
      return data;
    },
  });
};

export const useIssueBook= () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIssue,
    onSuccess: issue => {
      dispatch(
        issueBook({
          bookId: issue.bookId,
          memberId: issue.memberId
          
        })
      );
      queryClient.invalidateQueries({ queryKey: ["issuedBooks"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    }
  });
};


export const useReturnBook = () => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnIssue,
    onSuccess: (issue) => {
      dispatch(returnBook(issue.id));

      queryClient.invalidateQueries({ queryKey: ["issuedBooks"] });
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
