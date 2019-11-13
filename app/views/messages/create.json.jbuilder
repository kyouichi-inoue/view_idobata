json.content @message.content
json.image @message.image.url
json.user_id @message.user_id
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M") 
json.name @message.user.name
json.id @message.id