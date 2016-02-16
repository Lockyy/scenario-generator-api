class PrivatiseBucketAssets < ActiveRecord::Migration
  def self.up
    s3 = Aws::S3::Resource.new
    bucket = s3.bucket(ENV['S3_BUCKET_NAME'])
    objects = bucket.objects

    # This will take a while so a progress bar will be helpful
    total = 0
    objects.each do |object|
      total += 1
    end
    progressBar = ProgressBar.create(title: ' Objects Privatised:', total: total, format: '%t %c/%C %P%% %E')

    objects.each do |object|
      object.acl.put(acl: 'private')
      progressBar.increment
    end
    progressBar.finish
  end

  def self.down
    raise IrreversibleMigration
  end
end
