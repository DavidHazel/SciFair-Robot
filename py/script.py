#from prettytable import PrettyTable
import random


#build matrix
# Matrix code sample from http://stackoverflow.com/questions/6667201/how-to-define-two-dimensional-array-in-python
def buildMatrix(size):
	# Creates a list containing 5 lists initialized to 0
	Matrix = [[0 for x in range(size)] for x in range(size)] 
	#printMatrix(Matrix)
	return Matrix;

#print matrix w/ current contents
def printMatrix(matrix):
	for row in matrix:
	   print(row)


#initialize fattyAcid(s)
def initFattyAcid(matrix, fattyAcidCnt):
	for r in range(0,fattyAcidCnt):
		x = getRandom(0,matrixSize-1)
		y = getRandom(0,matrixSize-1)
		matrix[x][y] = 'F'
		print "Fatty Acid deployed to %s and %s " % (x,y)

#deploy robot
def deployRobot(matrix):
	x = getRandom(0,matrixSize-1)
	y = getRandom(0,matrixSize-1)
	if matrix[x][y] == 'F':
		print "Fatty Acid found at %s %s " % (x,y)
		return True
	else:
		#print "Not Found"
		return False


#generate a random number between a and b
def getRandom(a,b):
	r = random.randint(a,b)
	return r;


# python fatty acid finder


# set matrix size

matrixSize = 300

# set Fatty Acid Count
fattyAcidCnt = 300

# set number of robots
robotCnt = 1


#initialize the matrix
matrix = buildMatrix(matrixSize)
initFattyAcid(matrix, fattyAcidCnt)
printMatrix(matrix)

found = False
searchCnt = 0

while found == False:
	searchCnt = searchCnt+1
	found = deployRobot(matrix)

print "Matrix size = %s" % matrixSize
print "Fatty Acid Count= %s" % fattyAcidCnt
print "Search count = %s" % searchCnt





