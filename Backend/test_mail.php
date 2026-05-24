<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

try {
    \Illuminate\Support\Facades\Mail::raw('Test Email', function ($msg) {
        $msg->to('hrnyhy2005@gmail.com')->subject('Test OTP Fast Delivery');
    });
    echo "Sent successfully\n";
} catch (\Exception $e) {
    echo "Failed: " . $e->getMessage() . "\n";
}
