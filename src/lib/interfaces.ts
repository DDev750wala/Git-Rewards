export interface GithubInstallationApp {
    action:       "created" | "deleted" | "new_permissions_accepted" | "suspend" | "unsuspend";
    installation: Installation;
    repositories: Repository[];
    requester:    unknown;
    sender:       Sender;
}

interface Installation {
    id:                        number;
    client_id:                 string;
    account:                   Sender;
    repository_selection:      string;
    access_tokens_url:         string;
    repositories_url:          string;
    html_url:                  string;
    app_id:                    number;
    app_slug:                  string;
    target_id:                 number;
    target_type:               string;
    permissions:               Permissions;
    events:                    string[];
    created_at:                Date;
    updated_at:                Date;
    single_file_name:          null;
    has_multiple_single_files: boolean;
    single_file_paths:         any[];
    suspended_by:              null;
    suspended_at:              null;
}

interface Sender {
    login:               string;
    id:                  number;
    node_id:             string;
    avatar_url:          string;
    gravatar_id:         string;
    url:                 string;
    html_url:            string;
    followers_url:       string;
    following_url:       string;
    gists_url:           string;
    starred_url:         string;
    subscriptions_url:   string;
    organizations_url:   string;
    repos_url:           string;
    events_url:          string;
    received_events_url: string;
    type:                string;
    user_view_type:      string;
    site_admin:          boolean;
}

interface Permissions {
    discussions:   string;
    issues:        string;
    merge_queues:  string;
    metadata:      string;
    pull_requests: string;
}

interface Repository {
    id:        number;
    node_id:   string;
    name:      string;
    full_name: string;
    private:   boolean;
}


