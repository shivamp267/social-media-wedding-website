from django.contrib import admin
from django.urls import path
from socialmedia import settings
from userauth import views
from django.conf.urls.static import static

urlpatterns = [
    path('',views.home),
    path('loginn/',views.loginn),
    path('signup/',views.signup),
    path('logoutt/',views.logoutt),
    path('upload',views.upload),
    path('like-post/<str:id>', views.likes, name='like-post'),
    path('explore',views.explore),
    path('profile/<str:id_user>', views.profile),
    path('delete/<str:id>', views.delete),
    path('schedules/', views.schedules, name='schedules'),
    path('timeline/', views.timeline, name='timeline'),
    path('add-comment/<str:id>/', views.add_comment, name='add-comment'),
    path('delete-comment/<str:comment_id>/', views.delete_comment, name='delete-comment'),
]
