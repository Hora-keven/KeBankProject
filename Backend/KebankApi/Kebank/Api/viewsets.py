
from rest_framework import viewsets, status
from Kebank.Api.serializers import *
from Kebank.models import *
from decimal import Decimal
from Kebank.Api.number_rand import number_random
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response


class PhysicalPersonViewSet(viewsets.ModelViewSet):
    serializer_class = PhysicalPersonSerializer
    queryset = PhysicalPerson.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = [ "cpf"]
    
class JuridicPersonViewSet(viewsets.ModelViewSet):
    serializer_class = JuridicPersonSerializer
    queryset = JuridicPerson.objects.all()

    
class AccountViewSet(viewsets.ModelViewSet):
    serializer_class = AccountSerializer
    queryset = Account.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["id", "physical_person", "juridic_person", "from_account"]
    
    def create(self, request, *args, **kwargs):
        data = request.data
      
        account = Account(
          agency = 5434,
          number = number_random(100000000, 900000000),
          number_verificate = number_random(1, 9),
          type_account=data["type_account"],
          limit = number_random(300, 10000),
        
        )
       
        
        if data["physical_person"] == None:
            account.juridic_person = JuridicPerson.objects.get(cnpj=data["juridic_person"])
        
        else:
            account.physical_person = PhysicalPerson.objects.get(cpf=data["physical_person"])
           
            
        account_serializer = self.serializer_class(data=data) 
        
        if account_serializer.is_valid():
                account.save()
               
                return Response(data=account_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=account_serializer.data, status=status.HTTP_400_BAD_REQUEST)
       
    
class AddressViewSet(viewsets.ModelViewSet):
    serializer_class = AddressSerialzer
    queryset = Address.objects.all()
    
    
class CardViewSet(viewsets.ModelViewSet):
    serializer_class = CardSerializer
    queryset=Card.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["account"]

    def create(self, request, *args, **kwargs):
        data = request.data
        print(data["account"])
       
        card_serializer = CardSerializer(data=data)
      
        print(card_serializer.is_valid())

        if card_serializer.is_valid():
          
            card_serializer.save()
           

        return Response(data=card_serializer.data,status=status.HTTP_201_CREATED)
    
       
     
        
      
    
       
    

class LoanViewSet(viewsets.ModelViewSet):
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()
    
    def create(self, request, *args, **kwargs):
        data = request.data
        loan = Loan(
        account =Account.objects.get(id=data["account"]),
        requested_amount = Decimal(data["requested_amount"]),
        installment_quantity = data["installment_quantity"],
        installment_value=0.0
        )
        
        if loan.installment_quantity == 12 and loan.account.limit >= loan.requested_amount:
            loan.fees = Decimal(0.50)
            loan.installment_value = Decimal((loan.requested_amount+loan.requested_amount*loan.fees)/12)

        elif loan.installment_quantity == 24 and loan.account.limit >= loan.requested_amount:
            loan.fees = Decimal(0.60)
            loan.installment_value = Decimal((loan.requested_amount+loan.requested_amount*loan.fees)/24)
        elif loan.installment_quantity == 36 and loan.account.limit >= loan.requested_amount:
            loan.fees = Decimal(0.8)
            loan.installment_value = Decimal((loan.requested_amount+loan.requested_amount*loan.fees)/36)


        else:
            movimentation = Movimentation(
                value = loan.requested_amount,
                account = Account.objects.get(id=loan.account.id),
                state = "loan not approved"
            )
            
            movimentation.save()
            return Response(data=data, status=status.HTTP_400_BAD_REQUEST)
        
        loan.account.limit += loan.requested_amount
        loan.approved = True 
        movimentation = Movimentation(
                value = loan.requested_amount,
                account = Account.objects.get(id=loan.account.id),
                state = "loan successfully"
            )
        
            
        
        loan_serializer = LoanSerializer(data=data)
        if loan_serializer.is_valid():
            movimentation.save()
            loan.save() 
            loan.account.save()
            
            return Response(data=loan_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(data=loan_serializer.data,  status=status.HTTP_400_BAD_REQUEST)
   
   

class MovimentationViewSet(viewsets.ModelViewSet):
    serializer_class = MovimentationSerializer
    queryset = Movimentation.objects.all()
    
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["account"]
    
class PixViewSet(viewsets.ModelViewSet):
    serializer_class = PixSerializer
    queryset = Pix.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["from_account"]
    
    def create(self, request, *args, **kwargs):
        data = request.data
        print(data["from_account"])
        pix = Pix(
        from_account = Account.objects.get(id=data["from_account"]),
        value = Decimal(data["value"]),
        to_account = Account.objects.get(id=data["to_account"])
        )
      
        if pix.value > pix.from_account.limit:
            return Response("Value is bigger than your limit", status=status.HTTP_404_NOT_FOUND)
            
        else:
            pix.from_account.limit -= pix.value
            pix.to_account.limit += pix.value
            
         
        movimetation_from = Movimentation(
          value = (-pix.value),
          account = Account.objects.get(id = pix.from_account.id),
          state = "sent"
        )
        movimetation_to= Movimentation(
          value = pix.value,
          account = Account.objects.get(id = pix.to_account.id),
          state = "received"
        )
        
        pix_serializer = PixSerializer(data=data)
        
        if pix_serializer.is_valid():
            movimetation_from.save()
            movimetation_to.save()
            pix.from_account.save()
            pix.to_account.save()
            pix.save()
            
            return Response(pix_serializer.data, status=status.HTTP_201_CREATED)
        
        return Exception("Error")
    
    
class InvestmentViewSet(viewsets.ModelViewSet):
    serializer_class = InvestmentSerializer
    queryset = Investment.objects.all()
    
    def create(self, request, *args, **kwargs):
        data = request.data
        
        investment = Investment(

            contribuition = Decimal(data["contribuition"]),
            investment_type=data["investment_type"],
            date_closure=data["date_closure"],
            account = Account.objects.get(id=data["account"]),
            rentability = "100% CDI",
            administration_fee = Decimal(0.10)
           
        )
        
        if investment.account.limit < investment.contribuition:
            movimetation = Movimentation(
                value = (-investment.contribuition),
                account = investment.account,
                state = "Investment not approved"
                )
            movimetation.save()
            raise Exception("Your contribuition is more than your limit")

     
        investment.account.limit -= investment.contribuition
        invest_serializer = InvestmentSerializer(data=data)

        movimetation = Movimentation(
          value = (-investment.contribuition),
          account = investment.account,
          state = "Investment"
        )
        
        if invest_serializer.is_valid():
            investment.save()
            movimetation.save()
            investment.account.save()
            
            return Response(data=invest_serializer.data)
            
            
class CreditCardViewSet(viewsets.ModelViewSet):
    serializer_class = CreditCardSerializer
    queryset = CreditCard.objects.all()

    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["account"]
    
    def create(self, request, *args, **kwargs):
        data = request.data
        number = number_random(a=100000000000, b=1000000000000)

        credit_card = CreditCard(
            account=Account.objects.get(id=data["account"]),
            flag_card = "Visa",
            number = str(number)+"2304",
            validity = "12/2035",
            cvv = number_random(a=100, b=900),

        )
        if credit_card.account.limit >= 1000:
            credit_card.limit = credit_card.account.limit * Decimal(0.5)
        
        elif credit_card.account.limit <= 500:
            credit_card.limit =credit_card.account.limit * Decimal( 0.2)
        else:
            raise Exception("credit card is not aprroved")

        credit_card_serializer = CreditCardSerializer(data=data)

        if credit_card_serializer.is_valid():
            credit_card.save()

            return Response(credit_card_serializer.data, 
                            status=status.HTTP_201_CREATED)
        
        return super().create(request, *args, **kwargs)

