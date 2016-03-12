class UserMailer < ApplicationMailer

  def welcome_email(user)
    @user = user
    @url  = 'https://www.nextnoms.com'
    mail(to: @user.email, subject: 'Welcome to NextNoms')
  end
end
