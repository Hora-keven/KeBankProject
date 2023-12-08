from rest_framework import serializers

from Kebank.models import *
from . number_rand import *
from django.contrib.auth import get_user_model

from djoser.serializers import UserCreateSerializer


date_future_timezone = date_time()

User = get_user_model()

class UserSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ["id","first_name", "surname", "email", "password" ,'cpf_cnpj', "image"]
        
class AddressSerialzer(serializers.ModelSerializer):
    class Meta:
      model = Address
      fields = "__all__"
  
class MovimentationSerializer(serializers.ModelSerializer):
    date_hour = serializers.SerializerMethodField()
    class Meta:
      model = Movimentation
      fields = "__all__"
  
    def get_date_hour(self, instance):
        return instance.date_hour.strftime('%d/%m/%Y %H:%M:%S')
    
    def create(self, validated_data):
        return Movimentation.objects.create(**validated_data)
      
class CardSerializer(serializers.ModelSerializer):
  
  class Meta:
    model = Card
    fields = "__all__"

      
class LoanSerializer(serializers.ModelSerializer):
  class Meta:
    model = Loan
    fields = "__all__"
  

class AccountSerializer(serializers.ModelSerializer):
    account_card = CardSerializer(many=True, read_only=True)
  
    physical_and_juridic_name = serializers.SerializerMethodField()
    class Meta:
      model = Account
      fields = ["id","physical_and_juridic_name", "account_card", "physical_person", "agency", "number", "limit","juridic_person","number_verificate","type_account" ]

    def get_physical_and_juridic_name(self, obj):
        physical_person = getattr(obj, 'physical_person', None)
        juridic_person = getattr(obj, 'juridic_person', None)

        if physical_person:
            user = physical_person.fk_user
            return {'id': user.id, 'name': user.first_name}
        
        elif juridic_person:
            user = juridic_person.fk_user
            return {'id': user.id, 'Company_name': user.first_name}
        else:
            return None
        
    def create(self, validated_data):
        physical_person = validated_data.pop('physical_person')  
        juridic_person = validated_data.pop("juridic_person")
        
        to_account_physical_person = Account.objects.create(**physical_person)
        to_account_juridic_person = Account.objects.create(**juridic_person)
   
        validated_data['physical_person'] = to_account_physical_person
        validated_data['juridic_person'] = to_account_juridic_person
      
        return to_account_physical_person
        
class PhysicalPersonSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = PhysicalPerson
        fields = [  "cpf", "rg","born_date", "user", "fk_user"]

    def get_user(self, obj):
        user = obj.fk_user
        return {'id': user.id, 'first_name': user.first_name}

class JuridicPersonSerializer(serializers.ModelSerializer):
  class Meta:
        model = JuridicPerson
        fields = "__all__"
    
class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
      model = Investment
      fields = "__all__"

class CreditCardSerializer(serializers.ModelSerializer):
   class Meta:
      model=CreditCard
      fields = "__all__"

      write_only_fields = "account"

        
  
      
    
    
    
      

      
      
  

  
        
        
        
