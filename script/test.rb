require 'RMagick'
require 'digest'

url = ARGV[0]
hash = Digest::SHA2.hexdigest( "#{Time.now.utc}--#{url}" )
wget_command = "wget -O #{hash} " + url

system( wget_command )
