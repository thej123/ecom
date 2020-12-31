from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import authentication_classes, permission_classes

from .models import CustomUser

class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        # we pop the password since it has to be saved using set_password
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_date)

        # password can only be set through set_password method
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                # password needs to be updated only using set_password method
                instance.set_password(value)
            else:
                # Every other attribute other than password gets updated with setattr
                setattr(instance, attr, value)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {'write_only': True}}
        # is_staff, is_superuser comes from AbstarctUser class which we inherited in CustomUser
        field = ('name', 'email', 'password', 'phone', 'gender', 'is_active', 'is_staff', 'is_superuser')
