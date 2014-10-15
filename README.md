= AdminAuthentication

This project rocks and uses MIT-LICENSE.


1) Place the Engine folder(AdminAuthentication) inside your application or near to your application folder
2) Open the gem file from your application.
3) add gem 'mysql2' and 
  gem 'admin_authentication', :path => '../AdminAuthentication'
Note: Path will be differ based on where you placed the Engine

4) configure database name, username, password for your app
5) run bundle install and check engine gem imported or not
6) run rake admin_authentication:install:migrations

Note :: If you face "Incorrect MySQL client library version!" problem just give "gem uninstall mysql2" and then "gem install mysql2" after this run rake db

7) run rake db:migrate
8) Find dashboard_controller.rb from engine and change 
      redirect_to "/your_controller/action
9) Add below line to your controllers where you want to give access to authorized users only
      before_action :authenticate_user!
10) Add below line to routes.rb file
  mount AdminAuthentication::Engine, :at => '/' 
  Note :: Must be in last line
11)Add some users to 'admin_authentication_authorized_users' table
      this is the example how to add users
      11.1) rails console
      11.2) new_user = AdminAuthentication::AuthorizedUsers.new
      11.3) new_user.name = "your name"
      11.4) new_user.email = "your email"
      11.5) new_user.save
12) Add signout link wherever you want by using below code

      <div id="user_nav" style = "padding-top:25px;">
            <% if user_signed_in? %>
            Signed in as <%= current_user.email %><br>
            <%= link_to "/omniauth_callbacks/delete_session" do %>Sign out<% end %> 
            <% end %>
      </div>
