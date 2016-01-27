Fletcher::Dashboard::SECTIONS.each do |type|
  json.set! type do
    json.partial! type, locals: {type: type, data: @dashboard.send(type)}
  end
end
