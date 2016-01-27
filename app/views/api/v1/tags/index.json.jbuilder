json.total Tag.all.size
json.tags do
  ('a'..'z').to_a.each do |letter|
    json.set! letter do
      if @tags[letter]
        json.total @tags[letter].size
        json.tags @tags[letter] { |tag| json.(tag, :name, :slug) }
      else
        json.total 0
        json.tags []
      end
    end
  end
end
