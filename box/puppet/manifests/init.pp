class { 'nginx':
  sendfile => 'off',
}

nginx::resource::vhost { 'localhost:7000':
  www_root => '/var/www/prod',
  listen_port => 7000,
}

nginx::resource::vhost { 'localhost:7001':
  www_root => '/var/www/dev',
  listen_port => 7001,
}

class { 'nodejs':
  version => 'stable',
}

package { 'grunt-cli':
  ensure   => present,
  provider => 'npm',
  require  => Class['nodejs'],
}