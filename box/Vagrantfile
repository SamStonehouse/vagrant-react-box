# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"
  config.vm.network :forwarded_port, host: 5000, guest: 80

  config.vm.synced_folder "../src/", "/var/src"
  config.vm.synced_folder "../scripts/", "/home/vagrant/scripts"

  config.vm.provision "shell", :inline => <<-SHELL
    apt-get update
    apt-get install -y puppet
  SHELL

  config.vm.provision :puppet do |puppet| 
    puppet.options = "--verbose --debug" 
    puppet.manifests_path = 'puppet/manifests'
    puppet.module_path = 'puppet/modules'
    puppet.manifest_file = 'init.pp'
  end
end
