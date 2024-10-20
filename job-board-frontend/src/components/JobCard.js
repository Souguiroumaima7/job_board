import { useState } from 'react';
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Calendar, MapPin, Briefcase } from 'lucide-react';

export default function JobCard({ 
  job = {
    id: 1,
    title: "Software Engineer",
    company: "Tech Corp",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "We're looking for a talented software engineer to join our team...",
    postedDate: "2024-03-15"
  },
  isAuthenticated = false,
  onAuthenticationRequired = () => alert("Please sign in to apply")
}) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleApplyClick = () => {
    if (!isAuthenticated) {
      onAuthenticationRequired();
      return;
    }
    setShowApplyModal(true);
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const formData = {
      coverLetter: e.target.coverLetter.value,
      resumeLink: e.target.resumeLink.value
    };

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId: job.id,
          ...formData
        })
      });

      if (!response.ok) throw new Error('Application submission failed');
      
      setShowApplyModal(false);
      // You might want to show a success toast here
    } catch (error) {
      setSubmitError('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{job.title}</CardTitle>
        <CardDescription>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{job.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600">{job.description}</p>
      </CardContent>

      <CardFooter>
        <Dialog open={showApplyModal} onOpenChange={setShowApplyModal}>
          <Button className="w-full" onClick={handleApplyClick}>
            Apply Now
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Apply for {job.title}</DialogTitle>
              <DialogDescription>
                Submit your application for {job.title} at {job.company}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Resume Link
                </label>
                <Input
                  name="resumeLink"
                  type="url"
                  placeholder="Link to your resume"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Cover Letter
                </label>
                <Textarea
                  name="coverLetter"
                  placeholder="Why do you want to work with us?"
                  rows={5}
                  required
                />
              </div>

              {submitError && (
                <p className="text-red-500 text-sm">{submitError}</p>
              )}

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowApplyModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}