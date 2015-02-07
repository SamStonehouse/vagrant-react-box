class { 'nginx':
  sendfile => 'off',
}

nginx::resource::vhost { 'localhost:7000':
  www_root => '/var/src/build-dev',
  listen_port => 7000,
}

nginx::resource::vhost { 'localhost:7001':
  www_root => '/var/src/build-prod',
  listen_port => 7001,
}

nginx::resource::vhost { 'localhost:7002':
  www_root => '/var/src/dist',
  listen_port => 7002,
}

class { 'nodejs':
  version => 'stable',
}

package { 'grunt-cli':
  ensure   => present,
  provider => 'npm',
  require  => Class['nodejs'],
}