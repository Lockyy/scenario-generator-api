json.total @notifications.size

json.notifications @notifications.first(5) do |notification|
  json.id         notification.id
  json.viewed     notification.viewed
  json.type       notification.notification_type
  json.text       notification.text
  json.created_at notification.created_at

  json.sender do
    json.id   notification.sender.id
    json.name notification.sender.name
  end

  json.subject do
    json.id   notification.notification_subject_id
    json.type notification.notification_subject_type
    json.name notification.notification_subject.name
  end
end