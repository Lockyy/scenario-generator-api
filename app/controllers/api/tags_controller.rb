class Api::TagsController < AppController

  def show
    @tag = Tag.friendly.find(params[:id])
    params[:sorting] = params[:sorting] || 'alphabetical_order'

    @total_products = unique(@tag.products).size
    @products = sorted_products(params[:sorting]).paginate(page: params[:page], per_page: 10)

    respond_to do |format|
      format.json { render }
    end
  end

  def follow
    @tag = Tag.find_by(slug: params[:id])

    @result = false
    if @tag
      @tag.follow(current_user)
      @result = true
    end

    respond_to do |format|
      format.json { render }
    end
  end

  def unfollow
    @tag = Tag.find_by(slug: params[:id])

    @tag.unfollow(current_user) if @tag

    respond_to do |format|
      format.json { render }
    end
  end

  private

  def sorted_products(sorting)
    case sorting
    when 'latest'
      unique(@tag.products).recently_added
    when 'high_to_low'
      unique(@tag.products).best_rating
    when 'low_to_high'
      unique(@tag.products).worst_rating
    else
      unique(@tag.products)
    end
  end

  # We do it like this because .uniq just returns an
  # array, but we need an active record object for will_paginate to work
  # nicely
  def unique(objects)
    ids = objects.uniq.map(&:id)
    Product.where(id: ids)
  end
end
