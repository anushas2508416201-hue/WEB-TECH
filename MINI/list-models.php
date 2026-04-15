<?php
// List models
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once __DIR__ . '/../config/chatbot_config.php';

echo "Listing models for key: " . substr(GOOGLE_API_KEY, 0, 5) . "...\n";

$url = 'https://generativelanguage.googleapis.com/v1beta/models?key=' . GOOGLE_API_KEY;
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Add referer just in case
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($response, true);
if (isset($data['models'])) {
    foreach ($data['models'] as $model) {
        if (in_array('generateContent', $model['supportedGenerationMethods'])) {
            echo "Model: " . $model['name'] . "\n";
        }
    }
} else {
    echo "No models found or error.\n";
    echo $response;
}
?>
