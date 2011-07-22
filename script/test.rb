require 'RMagick'


url = ARGV[0]
hash = ARGV[1]
save_dir = ENV["OLDPWD"] + "/pictures/";

wget_command = "wget -O #{save_dir + hash} #{url}";
system( wget_command )
