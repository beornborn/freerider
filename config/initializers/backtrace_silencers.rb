bc = BacktraceCleaner.new
bc.add_filter   { |line| line.gsub(Rails.root.to_s, '') } # strip the Rails.root prefix
bc.add_silencer { |line| line =~ /mongrel|rubygems/ } # skip any lines from mongrel or rubygems
bc.clean(exception.backtrace) # perform the cleanup
