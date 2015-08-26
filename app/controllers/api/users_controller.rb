class Api::UsersController < AppController
  before_filter :set_current_user_id

  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.json { render }
    end
  end

  def recent_activity
    @user = User.find(params[:id])

    respond_to do |format|
      format.json { render }
    end
  end

  private

  def set_current_user_id
    params[:id] = current_user.id if params[:id] == 'current'
  end
end
