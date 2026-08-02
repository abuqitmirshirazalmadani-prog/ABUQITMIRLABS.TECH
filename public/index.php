<?php
// Silence is golden. Disable directory listing and return 403 Forbidden.
http_response_code(403);
header('HTTP/1.1 403 Forbidden');
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>403 Forbidden</title>
    <style>
        body { font-family: system-ui, -apple-system, sans-serif; background: #080808; color: #e8e8e8; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        .box { text-align: center; border: 1px solid #333; padding: 2rem 3rem; border-radius: 8px; background: #0f0f0f; }
        h1 { color: #ccff00; margin: 0 0 1rem 0; font-size: 2rem; }
        p { color: #9ca3af; margin: 0; }
    </style>
</head>
<body>
    <div class="box">
        <h1>403 Forbidden</h1>
        <p>Directory browsing is disabled on this server.</p>
    </div>
</body>
</html>
