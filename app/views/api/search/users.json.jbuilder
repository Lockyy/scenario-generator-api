json.search_string params[:search_string]
json.total_results @users.size

json.users do
  json.total @users.size
  json.data  @users, partial: 'api/users/search_user', as: :user
end