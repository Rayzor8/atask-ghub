interface User {
    id: number
    login: string
    avatar_url: string
    html_url: string
  }
  
  interface Repository {
    id: number
    name: string
    description: string | null
    html_url: string
    language: string | null
    stargazers_count: number
    forks_count: number
    updated_at: string
  }
  
  interface GitHubState {
    users: User[]
    repositories: Repository[]
    loading: boolean
    error: string | null
  }