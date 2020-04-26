CREATE TABLE IF NOT EXISTS channel (
    channel_id   varchar(64)   PRIMARY KEY,
    channel_name varchar(256)  NOT NULL,
    room_id      varchar(64)   NOT NULL,
    channel_data varchar(1024) NOT NULL,
    created_at   datetime      NOT NULL,
    updated_at   datetime      NOT NULL,
    deleted_at   datetime
);
