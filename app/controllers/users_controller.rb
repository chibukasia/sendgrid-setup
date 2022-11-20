class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid_entry
    # Get all users
    def index 
        users= User.all 
        render json: users
    end

    # Create a user 
    def create 
        @user = User.create!(user_params)
        @from = "chibukasianelson@gmail.com"
        @subject = "New User Account"
        @content = "Thank you for registering with us #{@user.username}. Your account has been created successfully"
        EmailService.call(from: @from, to: @user.email, subject: @subject, content: @content)
        render json: {body: @user, message: "User created successfully"}, status: :created
    end

    # Private methods
    private 

    def user_params
        params.permit(:username, :email)
    end

    # Invalid entity response 
    def invalid_entry(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity 
    end
end
