CREATE TABLE IF NOT EXISTS attachment (
    attachmet_id varchar(64) PRIMARY KEY,
    filename varchar(256) NOT NULL,
    message_id varchar(64) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    deleted_at datetime
)
