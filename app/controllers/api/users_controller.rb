class Api::UsersController < AppController
  before_filter :set_current_user_id, :set_user

  def show
    respond_to do |format|
      format.json { render }
    end
  end

  def recent_activity
    @recent_activity = current_user.recent_activity(params[:sorting])
      .paginate(:page => params[:page] || 1 , :per_page => params[:per_page] || 4)

    respond_to do |format|
      format.json { render }
    end
  end

  def tags
    @update_user_tags = Fletcher::User::UpdateUserTags.new(current_user, params[:tags])

    respond_to do |format|
      if @update_user_tags.update!
        format.json { render :show, status: :ok, location: tags_api_user_url(current_user) }
      else
        format.json { render json: @update_user_tags.errors, status: :unprocessable_entity }
      end
    end
  end

  def followed_tags
    @tags = current_user.tags

    respond_to do |format|
      format.json { render }
    end
  end

  private

  def set_current_user_id
    params[:id] = current_user.id if params[:id] == 'current'
  end

  def set_user
    @user = User.find(params[:id])
  end
end
