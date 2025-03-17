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
