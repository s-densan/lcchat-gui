CREATE TABLE IF NOT EXISTS channel_folder (
    channel_folder_id        varchar(64) PRIMARY KEY,
    channel_folder_name      varchar(256) NOT NULL,
    parent_channel_folder_id varchar(64) NOT NULL,
    channel_folder_data      varchar(1024) NOT NULL,
    created_at datetime NOT NULL,
    updated_at datetime NOT NULL,
    deleted_at datetime
)
