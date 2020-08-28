import path from 'path';

export const isImageFile = (filePath: string): boolean => {
  const ext = path.extname(filePath).toLowerCase();
  return /(jpe?g|gif|png|webp|bmp|avif)/.test(ext);
};

export const isAudioFile = (filePath: string): boolean => {
  const ext = path.extname(filePath).toLowerCase();
  return /(mp3|aac|m4a|ogg|wav)/.test(ext);
};
export const isVideoFile = (filePath: string): boolean => {
  const ext = path.extname(filePath).toLowerCase();
  return /(mp4|m4v)/.test(ext);
};

export const getMINEType = (filePath: string): { type: string, subType: string } | undefined => {
  const ext = path.extname(filePath).toLowerCase();

  const mineMap = [
    // テキスト
    { pattern: 'txt', type: 'text', subType: 'plain' },
    // HTML
    { pattern: 'html?', type: 'text', subType: 'html' },
    // XHTML
    { pattern: 'xhtml', type: 'application', subType: 'xhtml+xml' },
    // XML
    { pattern: 'xml', type: 'text', subType: 'xml' },
    // RSS
    { pattern: 'rss|.xml', type: 'application', subType: 'rss+xml' },
    // CSS
    { pattern: 'css', type: 'text', subType: 'css' },
    // JavaScrip
    { pattern: 'js', type: 'text', subType: 'javascript' },
    // VBScript
    { pattern: 'vbs', type: 'text', subType: 'vbscript' },
    // CGI
    { pattern: 'cgi', type: 'application', subType: 'x-httpd-cgi' },
    // PHP
    { pattern: 'php', type: 'application', subType: 'x-httpd-php' },
    // GIF
    { pattern: 'gif', type: 'image', subType: 'gif' },
    // JPEG
    { pattern: 'jpe?g', type: 'image', subType: 'jpeg' },
    // PNG
    { pattern: 'png', type: 'image', subType: 'png' },
    // アイコン
    { pattern: 'ico', type: 'image', subType: 'vnd.microsoft.icon' },
    // webp
    { pattern: 'webp', type: 'image', subType: 'webp' },
    // Flash
    { pattern: 'swf', type: 'application', subType: 'x-shockwave-flash' },
    // MPEG
    { pattern: 'mpe?g', type: 'video', subType: 'mpeg' },
    // MP4
    { pattern: 'mp4', type: 'video', subType: 'mp4' },
    // WebM
    { pattern: 'webm', type: 'video', subType: 'webm' },
    // Ogg
    { pattern: 'ogv', type: 'video', subType: 'ogg' },
    // QuickTime
    { pattern: 'mov|.qt', type: 'video', subType: 'quicktime' },
    // AVI
    { pattern: 'avi', type: 'video', subType: 'x-msvideo' },
    // MP3
    { pattern: 'mp3', type: 'audio', subType: 'mpeg' },
    // AAC
    { pattern: 'm4a', type: 'audio', subType: 'aac' },
    // Ogg
    { pattern: 'ogg', type: 'audio', subType: 'ogg' },
    // MIDI
    { pattern: 'midi?', type: 'audio', subType: 'midi' },
    // RealAudio
    { pattern: 'ra', type: 'audio', subType: 'vnd.rn-realaudio' },
    // WAVE
    { pattern: 'wav', type: 'audio', subType: 'wav' },
    // ZIP
    { pattern: 'zip', type: 'application', subType: 'zip' },
    // PDF
    { pattern: 'pdf', type: 'application', subType: 'pdf' },
    // Word
    { pattern: 'doc', type: 'application', subType: 'msword' },
    // Excel
    { pattern: 'xls', type: 'application', subType: 'msexcel' },
  ];
  const mineType = mineMap.find((v) => RegExp(v.pattern).test(ext));
  return mineType;
};
