class Array
  def sum
    inject(0.0) { |result, el| result + el }
  end

  def average
    sum / size
  end
end