CREATE TABLE IF NOT EXISTS logins (
    login_id varchar(64)       PRIMARY KEY,
    user_id varchar(64)        NOT NULL,
    status varchar(64)         NOT NULL,
    login_data varchar(1024)   NOT NULL,
    created_at datetime        NOT NULL,
    updated_at datetime        NOT NULL
)
