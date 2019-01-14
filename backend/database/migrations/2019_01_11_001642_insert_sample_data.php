<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InsertSampleData extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \App\Models\User::create([
            'email' => 'user@sample.com',
            'password' => \Illuminate\Support\Facades\Hash::make('secret'),
            'name' => 'Sample User'
        ]);

        \Illuminate\Support\Facades\DB::select("INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`)
        VALUES
            (1, NULL, 'Laravel Personal Access Client', '5SFsLwi9IlJmk5sW1chAw3cME5648IsEOhDIKiOy', 'http://asdasdsa', 1, 0, 0, '2019-01-11 00:22:28', '2019-01-11 00:22:28'),
            (2, NULL, 'Laravel Password Grant Client', '', 'http://locaasdasdas lhost', 0, 1, 0, '2019-01-11 00:22:28', '2019-01-11 00:22:28');
        ");



    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
