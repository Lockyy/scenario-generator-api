class Api::UsersController < AppController
  def current
    @user = current_user

    respond_to do |format|
      format.json { render :show }
    end
  end

  def show
    @user = User.find(params[:id])

    respond_to do |format|
      format.json { render }
    end
  end
end
