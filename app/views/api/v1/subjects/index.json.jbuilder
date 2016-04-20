json.subjects @subjects do |subject|
  json.(subject, :id, :name)
  json.total_generators subject.generators.length
end