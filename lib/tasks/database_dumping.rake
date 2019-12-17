namespace :db do
  desc "Dumps the database to backups"
  task :dump, [:stage] => :environment do |task, args|
    if args.stage.present?
      cmd = nil
      with_config do |app, host, db, user|
        cmd = "pg_dump -F c -v -h #{host} -d #{db} -f #{Rails.root}/db/backups/#{args.stage}_#{db}.psql"
      end
      puts cmd
      exec cmd
    else
      puts 'Please pass a stage to the task'
    end
  end

  desc "Restores the database from backups"
  task :restore, [:stage] => :environment do |task,args|
    if args.stage.present?
      cmd = nil
      with_config do |app, host, db, user|
        cmd = "pg_restore -F c -v -d #{db} #{Rails.root}/db/backups/#{args.stage}_#{db}.psql"
      end
      Rake::Task["db:drop"].invoke
      Rake::Task["db:create"].invoke
      puts cmd
      exec cmd
    else
      puts 'Please pass a stage to the task'
    end
  end

  private

  def with_config
    yield Rails.application.class.parent_name.underscore,
    ActiveRecord::Base.connection_config[:host],
    ActiveRecord::Base.connection_config[:database],
    ActiveRecord::Base.connection_config[:username]
  end
end
