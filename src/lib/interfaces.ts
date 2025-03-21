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



// ------------------------------------------------------------------------------


export interface IssueComment {
    action:       "created" | "edited" | "deleted";
    issue:        Issue;
    comment:      Comment;
    repository:   Repository1;
    sender:       Sender;
    installation: Installation;
}

export interface Comment {
    url:                      string;
    html_url:                 string;
    issue_url:                string;
    id:                       number;
    node_id:                  string;
    user:                     Sender;
    created_at:               Date;
    updated_at:               Date;
    author_association:       string;
    body:                     string;
    reactions:                Reactions;
    performed_via_github_app: null;
}

export interface Reactions {
    url:         string;
    total_count: number;
    "+1":        number;
    "-1":        number;
    laugh:       number;
    hooray:      number;
    confused:    number;
    heart:       number;
    rocket:      number;
    eyes:        number;
}

interface Installation {
    id:      number;
    node_id: string;
}

interface Issue {
    url:                      string;
    repository_url:           string;
    labels_url:               string;
    comments_url:             string;
    events_url:               string;
    html_url:                 string;
    id:                       number;
    node_id:                  string;
    number:                   number;
    title:                    string;
    user:                     Sender;
    labels:                   any[];
    state:                    string;
    locked:                   boolean;
    assignee:                 null;
    assignees:                any[];
    milestone:                null;
    comments:                 number;
    created_at:               Date;
    updated_at:               Date;
    closed_at:                Date;
    author_association:       string;
    sub_issues_summary:       SubIssuesSummary;
    active_lock_reason:       null;
    draft:                    boolean;
    pull_request:             PullRequest;
    body:                     string;
    reactions:                Reactions;
    timeline_url:             string;
    performed_via_github_app: null;
    state_reason:             null;
}

export interface PullRequest {
    url:       string;
    html_url:  string;
    diff_url:  string;
    patch_url: string;
    merged_at: Date;
}

export interface SubIssuesSummary {
    total:             number;
    completed:         number;
    percent_completed: number;
}

interface Repository1 {
    id:                          number;
    node_id:                     string;
    name:                        string;
    full_name:                   string;
    private:                     boolean;
    owner:                       Sender;
    html_url:                    string;
    description:                 null;
    fork:                        boolean;
    url:                         string;
    forks_url:                   string;
    keys_url:                    string;
    collaborators_url:           string;
    teams_url:                   string;
    hooks_url:                   string;
    issue_events_url:            string;
    events_url:                  string;
    assignees_url:               string;
    branches_url:                string;
    tags_url:                    string;
    blobs_url:                   string;
    git_tags_url:                string;
    git_refs_url:                string;
    trees_url:                   string;
    statuses_url:                string;
    languages_url:               string;
    stargazers_url:              string;
    contributors_url:            string;
    subscribers_url:             string;
    subscription_url:            string;
    commits_url:                 string;
    git_commits_url:             string;
    comments_url:                string;
    issue_comment_url:           string;
    contents_url:                string;
    compare_url:                 string;
    merges_url:                  string;
    archive_url:                 string;
    downloads_url:               string;
    issues_url:                  string;
    pulls_url:                   string;
    milestones_url:              string;
    notifications_url:           string;
    labels_url:                  string;
    releases_url:                string;
    deployments_url:             string;
    created_at:                  Date;
    updated_at:                  Date;
    pushed_at:                   Date;
    git_url:                     string;
    ssh_url:                     string;
    clone_url:                   string;
    svn_url:                     string;
    homepage:                    null;
    size:                        number;
    stargazers_count:            number;
    watchers_count:              number;
    language:                    null;
    has_issues:                  boolean;
    has_projects:                boolean;
    has_downloads:               boolean;
    has_wiki:                    boolean;
    has_pages:                   boolean;
    has_discussions:             boolean;
    forks_count:                 number;
    mirror_url:                  null;
    archived:                    boolean;
    disabled:                    boolean;
    open_issues_count:           number;
    license:                     null;
    allow_forking:               boolean;
    is_template:                 boolean;
    web_commit_signoff_required: boolean;
    topics:                      any[];
    visibility:                  string;
    forks:                       number;
    open_issues:                 number;
    watchers:                    number;
    default_branch:              string;
}



// ------------------------------------------------------------------------------

export interface SignUpWebhookClerk {
    data:             Data;
    event_attributes: EventAttributes;
    instance_id:      string;
    object:           string;
    timestamp:        number;
    type:             string;
}

export interface Data {
    backup_code_enabled:             boolean;
    banned:                          boolean;
    create_organization_enabled:     boolean;
    created_at:                      number;
    delete_self_enabled:             boolean;
    email_addresses:                 EmailAddress[];
    enterprise_accounts:             any[];
    external_accounts:               ExternalAccount[];
    external_id:                     null;
    first_name:                      string;
    has_image:                       boolean;
    id:                              string;
    image_url:                       string;
    last_active_at:                  number;
    last_name:                       string;
    last_sign_in_at:                 null;
    legal_accepted_at:               null;
    locked:                          boolean;
    lockout_expires_in_seconds:      null;
    mfa_disabled_at:                 null;
    mfa_enabled_at:                  null;
    object:                          string;
    passkeys:                        any[];
    password_enabled:                boolean;
    phone_numbers:                   any[];
    primary_email_address_id:        string;
    primary_phone_number_id:         null;
    primary_web3_wallet_id:          null;
    private_metadata:                Metadata;
    profile_image_url:               string;
    public_metadata:                 Metadata;
    saml_accounts:                   any[];
    totp_enabled:                    boolean;
    two_factor_enabled:              boolean;
    unsafe_metadata:                 Metadata;
    updated_at:                      number;
    username:                        string;
    verification_attempts_remaining: number;
    web3_wallets:                    any[];
}

export interface EmailAddress {
    created_at:             number;
    email_address:          string;
    id:                     string;
    linked_to:              LinkedTo[];
    matches_sso_connection: boolean;
    object:                 string;
    reserved:               boolean;
    updated_at:             number;
    verification:           Verification;
}

export interface LinkedTo {
    id:   string;
    type: string;
}

export interface Verification {
    attempts:  null;
    expire_at: number | null;
    status:    string;
    strategy:  string;
}

export interface ExternalAccount {
    approved_scopes:   string;
    avatar_url:        string;
    created_at:        number;
    email_address:     string;
    first_name:        string;
    id:                string;
    identification_id: string;
    image_url:         string;
    label:             null;
    last_name:         string;
    object:            string;
    provider:          string;
    provider_user_id:  string;
    public_metadata:   Metadata;
    updated_at:        number;
    username:          string;
    verification:      Verification;
}

export interface Metadata {
}

export interface EventAttributes {
    http_request: HTTPRequest;
}

export interface HTTPRequest {
    client_ip:  string;
    user_agent: string;
}
 //------------------------------------------------------Contract

 export interface ContractFunctions {
    addAmount: (_user: string, _repoName: string, overrides?: { value: bigint }) => Promise<void>;
    removeAmount: (_user: string, _repoName: string, amount: bigint, overrides?: { value: bigint }) => Promise<void>;
    sendReward: (_user: string, recipient: string, amount: bigint, _repoName: string, overrides?: { value: bigint }) => Promise<void>;
    withdraw: () => Promise<void>;
    getRepoAmount: (_addr: string, _repoName: string) => Promise<bigint>;
    userRepoRewards: (_addr: string, _repoName: string) => Promise<bigint>;
  }
  
  export interface ContractEvents {
    AmountAdded: (user: string, repoName: string, amount: bigint) => void;
    AmountRemoved: (user: string, repoName: string, amount: bigint) => void;
    RewardSent: (user: string, recipient: string, amount: bigint, repoName: string) => void;
  }
  
  export interface ContractErrors {
    InsufficientBalance: () => void;
    InvalidRecipient: () => void;
    InvalidUser: () => void;
    TransferFailed: () => void;
  }
  