CREATE TABLE IF NOT EXISTS message (
    message_id varchar(64)     PRIMARY KEY,
    text varchar(256)          NOT NULL,
    user_id varchar(64)        NOT NULL,
    channel_id varchar(64)     NOT NULL,
    message_data varchar(1024) NOT NULL,
    posted_at datetime         NOT NULL,
    created_at datetime        NOT NULL,
    updated_at datetime        NOT NULL,
    deleted_at datetime
)
