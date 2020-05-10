CREATE TABLE IF NOT EXISTS user (
    user_id    varchar(64)   PRIMARY KEY,
    user_name  varchar(64)   NOT NULL,
    user_data  varchar(1024) NOT NULL,
    created_at datetime      NOT NULL,
    updated_at datetime      NOT NULL,
    deleted_at datetime
)