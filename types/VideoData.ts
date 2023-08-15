interface VideoData {
    id: string
    title: string
    description: string
    url: string
    uploader: {
        displayName: string | null
        photoURL: string | null
        id: string
    }
    likes: string[]
    dislikes: string[]
    comments: {
        id: string
        comment: string
        user: {
            displayName: string
            photoURL: string
            id: string
        }
        date: string
    }[]
    views: string[]
    date: string
}
export default VideoData
