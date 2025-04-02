#-*-coding:UTF-8-*-
print("qual é a quantidade de cigarros que vc ja fumou e por quantos anos")
cigarros = int(input("quantidade de cigarros fumados por dia"))
anos = float(input("quantidade em anos"))
calcule1 = cigarros * 0.00694444
calcule2 = anos * 365 * calcule1
print("o tempo de vida que ele perdeu em dias foi de: %.2f " %calcule2)
print(f"o resultatdo é{calcule2}")
